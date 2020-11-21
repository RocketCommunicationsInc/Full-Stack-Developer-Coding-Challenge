class CreateAlerts < ActiveRecord::Migration[5.2]
  def change
    create_table :alerts do |t|
      t.string :errorId, null: false
      t.string :errorSeverity, null: false
      t.string :errorCategory, null: false
      t.string :errorMessage, null: false
      t.string :longMessage, null: false
      t.integer :errorTime, limit: 8, null: false 
      t.boolean :selected, null: false
      t.boolean :new, null: false
      t.boolean :expanded, null: false
      
      t.timestamps
    end
  end
end
