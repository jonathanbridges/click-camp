class CreateReservations < ActiveRecord::Migration[5.2]
  def change
    create_table :reservations do |t|
      t.integer :camper_id, null: false
      t.integer :listing_id, null: false
      check_in :date, null: false
      check_out :date, null: false
      t.timestamps
    end
    add_index :reservations, :camper_id
    add_index :reservations, :listing_id
  end
end
