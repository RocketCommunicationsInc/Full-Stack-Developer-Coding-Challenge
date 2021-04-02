class CreateAlerts < ActiveRecord::Migration[6.1]
  def change
    create_table :alerts do |t|
        t.string :errorId
        t.string :errorSeverity
        t.string :errorCategory
        t.text :errorMessage
        t.text :longMessage
        t.integer :errorTime
        t. boolean :selected
        t. boolean :new
        t. boolean :expanded
        t.timestamps
    end
  end
end
