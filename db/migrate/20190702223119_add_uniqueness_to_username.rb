class AddUniquenessToUsername < ActiveRecord::Migration[5.2]

  def change
    add_index :users, [:username, :email, :session_token], :unique => true
  end
end
