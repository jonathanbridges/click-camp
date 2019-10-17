class DropLocationsTable < ActiveRecord::Migration[5.2]
  def change
    drop_table :locations
  end
end
