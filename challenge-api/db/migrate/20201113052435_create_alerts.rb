class CreateAlerts < ActiveRecord::Migration[6.0]
  def change
    create_table :alerts do |t|
      t.text :errorId
      t.text :errorSeverity
      t.text :errorCategory
      t.text :errorMessage
      t.text :longMessage
      t.bigint :errorTime
      t.boolean :selected
      t.boolean :new
      t.boolean :expanded

      t.timestamps
    end
  end
end
