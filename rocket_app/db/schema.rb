# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2020_11_21_023731) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alerts", force: :cascade do |t|
    t.string "errorId", null: false
    t.string "errorSeverity", null: false
    t.string "errorCategory", null: false
    t.string "errorMessage", null: false
    t.string "longMessage", null: false
    t.bigint "errorTime", null: false
    t.boolean "selected", null: false
    t.boolean "new", null: false
    t.boolean "expanded", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "contacts", force: :cascade do |t|
    t.string "_id", null: false
    t.string "contactId", null: false
    t.string "contactStatus", null: false
    t.integer "contactName", null: false
    t.string "contactGround", null: false
    t.string "contactSatellite", null: false
    t.string "contactEquipment", null: false
    t.string "contactState", null: false
    t.string "contactStep", null: false
    t.text "contactDetail", null: false
    t.integer "contactBeginTimestamp", null: false
    t.integer "contactEndTimestamp", null: false
    t.float "contactLatitude", null: false
    t.float "contactLongitude", null: false
    t.float "contactAzimuth", null: false
    t.float "contactElevation", null: false
    t.string "contactResolution", null: false
    t.string "contactResolutionStatus", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "username", null: false
    t.string "password_digest", null: false
    t.string "session_token", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["session_token"], name: "index_users_on_session_token", unique: true
    t.index ["username"], name: "index_users_on_username", unique: true
  end

end
