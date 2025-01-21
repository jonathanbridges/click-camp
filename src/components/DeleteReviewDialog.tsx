import {
    Button,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from '@mui/material';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useNavigate } from '@tanstack/react-router';
import { AlertType } from '../lib/alerts';
import { api } from '../lib/api';
import { QueryKeys } from '../lib/queryKeys';
// Removing unused import
// ... existing code ... 