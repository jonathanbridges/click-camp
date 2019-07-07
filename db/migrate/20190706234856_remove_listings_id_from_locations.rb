class RemoveListingsIdFromLocations < ActiveRecord::Migration[5.2]
  def change
    remove_column :locations, :listing_id
  end
end
