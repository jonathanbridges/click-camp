class CreateListings2 < ActiveRecord::Migration[5.2]
  def change
    create_table :listings do |t|
      t.integer :host_id, null: false
      t.integer :location_id, null: false
      t.string :name, null: false, unique: true
      t.text :description, null: false
      t.integer :cost, null: false
      t.timestamps
    end
    add_index :listings, :host_id
    add_index :listings, :location_id
  end
end
