class DropListings < ActiveRecord::Migration[5.2]
  def change
    drop_table :listings
  end
end
