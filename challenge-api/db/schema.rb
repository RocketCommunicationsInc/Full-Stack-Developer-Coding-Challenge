# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_11_13_052435) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alerts", force: :cascade do |t|
    t.text "errorId"
    t.text "errorSeverity"
    t.text "errorCategory"
    t.text "errorMessage"
    t.text "longMessage"
    t.bigint "errorTime"
    t.boolean "selected"
    t.boolean "new"
    t.boolean "expanded"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "contacts", force: :cascade do |t|
    t.text "_id"
    t.text "contactId"
    t.text "contactStatus"
    t.integer "contactName"
    t.text "contactGround"
    t.text "contactSatellite"
    t.text "contactEquipment"
    t.text "contactState"
    t.text "contactStep"
    t.text "contactDetail"
    t.integer "contactBeginTimestamp"
    t.integer "contactEndTimestamp"
    t.float "contactLatitude"
    t.float "contactLongitude"
    t.float "contactAzimuth"
    t.float "contactElevation"
    t.text "contactResolution"
    t.text "contactResolutionStatus"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "email"
    t.string "password_digest"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

end
