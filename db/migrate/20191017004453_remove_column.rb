class RemoveColumn < ActiveRecord::Migration[5.2]
  def change
    remove_column :listings, :location_id
  end
end
