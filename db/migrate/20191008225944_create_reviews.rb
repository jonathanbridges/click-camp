class CreateReviews < ActiveRecord::Migration[5.2]
  def change

    create_table :reviews do |t|
      t.integer :reviewer_id, null: false
      t.integer :listing_id, null: false
      t.text :text, null: false
      t.boolean :recommends, null: false, default: true
      t.timestamps
    end

    add_index :reviews, :reviewer_id
    add_index :reviews, :listing_id
  end
end
