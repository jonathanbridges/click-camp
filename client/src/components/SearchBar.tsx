import { Box, IconButton, InputBase, Paper, Typography, Popper, List, ListItem } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PlaceIcon from "@mui/icons-material/Place";
import { useRef, useState } from "react";
import { LocationSearchResult } from "../types/location";
import { useDebounce } from "../hooks/useDebounce";
import { useNavigate } from "@tanstack/react-router";
import { AppRoutes } from "../lib/routes";

export default function SearchBar() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<LocationSearchResult[]>([]);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const searchLocations = async (query: string) => {
    if (!query) {
      setSuggestions([]);
      return;
    }

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5&countrycodes=us`
      );
      const data: LocationSearchResult[] = await response.json();
      setSuggestions(data);
      setAnchorEl(inputRef.current);
    } catch (error) {
      console.error("Error fetching locations:", error);
      setSuggestions([]);
    }
  };

  const debouncedSearch = useDebounce(searchLocations, 300);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  const handleSuggestionClick = (suggestion: LocationSearchResult) => {
    setSearchTerm(suggestion.display_name.split(",")[0]); // Just use the first part of the address
    setSuggestions([]);
    setAnchorEl(null);
    
    const lat = parseFloat(suggestion.lat);
    const lng = parseFloat(suggestion.lon);
    
    // Set bounds to roughly cover the area around the searched location
    // This creates a viewport that's about 50 miles in each direction
    const latOffset = 0.5; // roughly 35 miles north/south
    const lngOffset = 0.5; // roughly 35 miles east/west at most latitudes
    
    navigate({
      to: AppRoutes.LISTINGS,
      search: {
        originLat: lat.toString(),
        originLng: lng.toString(),
        neLat: (lat + latOffset).toString(),
        neLng: (lng + lngOffset).toString(),
        swLat: (lat - latOffset).toString(),
        swLng: (lng - lngOffset).toString(),
        mapZoomLevel: "9",
      },
      replace: true,
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (suggestions.length > 0) {
      handleSuggestionClick(suggestions[0]);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Paper
        component="form"
        onSubmit={handleSubmit}
        sx={{
          display: "flex",
          alignItems: "center",
          borderRadius: 3,
          border: "1px solid #ddd",
          boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
          "&:hover": {
            boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          },
        }}
      >
        <Box 
          sx={{ 
            p: "16px 20px",
            display: "flex",
            alignItems: "center",
            flex: 1,
          }}
        >
          <PlaceIcon sx={{ color: "text.secondary", mr: 2, fontSize: "1.5rem" }} />
          <InputBase
            inputRef={inputRef}
            value={searchTerm}
            onChange={handleInputChange}
            sx={{ 
              flex: 1,
              fontSize: "1.1rem",
              "& input": {
                padding: "4px 0",
              }
            }}
            placeholder="Search destinations"
            inputProps={{ "aria-label": "search destinations" }}
          />
        </Box>
        <Box sx={{ p: "8px 12px" }}>
          <IconButton
            type="submit"
            sx={{
              bgcolor: "#e85325",
              color: "white",
              borderRadius: 2,
              p: "12px",
              "&:hover": {
                bgcolor: "#d44a20",
              },
            }}
            aria-label="search"
          >
            <SearchIcon sx={{ fontSize: "1.5rem" }} />
          </IconButton>
        </Box>
      </Paper>
      <Popper
        open={Boolean(anchorEl) && suggestions.length > 0}
        anchorEl={anchorEl}
        placement="bottom-start"
        style={{ width: anchorEl?.clientWidth, zIndex: 1300 }}
      >
        <Paper 
          elevation={3}
          sx={{ 
            mt: 1,
            maxHeight: 300,
            overflow: "auto",
            border: "1px solid #ddd",
          }}
        >
          <List>
            {suggestions.map((suggestion) => (
              <ListItem
                key={suggestion.place_id}
                onClick={() => handleSuggestionClick(suggestion)}
                sx={{
                  cursor: "pointer",
                  "&:hover": {
                    bgcolor: "action.hover",
                  },
                }}
              >
                <PlaceIcon sx={{ color: "text.secondary", mr: 2 }} />
                <Typography>{suggestion.display_name}</Typography>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
      <Typography 
        variant="body2" 
        sx={{ 
          mt: 1, 
          textAlign: "center",
          pl: 2,
          opacity: 0.8,
        }}
      >
        Try "San Francisco" to explore nearby camping spots...
      </Typography>
    </Box>
  );
} 