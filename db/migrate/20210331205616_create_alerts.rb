class CreateAlerts < ActiveRecord::Migration[6.0]
  def change
    create_table :alerts do |t|
      t.string(:errorId)
      t.string(:errorSeverity)
      t.string(:errorCategory)
      t.string(:errorMessage)
      t.string(:longMessage)
      t.integer(:errorTime)
      t.boolean(:selected)
      t.boolean(:new)
      t.boolean(:expanded)
    end
  end
end
