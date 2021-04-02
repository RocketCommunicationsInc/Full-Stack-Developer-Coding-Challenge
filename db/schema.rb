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

ActiveRecord::Schema.define(version: 2021_03_31_212134) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "alerts", force: :cascade do |t|
    t.string "errorId"
    t.string "errorSeverity"
    t.string "errorCategory"
    t.string "errorMessage"
    t.string "longMessage"
    t.integer "errorTime"
    t.boolean "selected"
    t.boolean "new"
    t.boolean "expanded"
  end

  create_table "contacts", force: :cascade do |t|
    t.string "_id"
    t.string "contactId"
    t.string "contactStatus"
    t.integer "contactName"
    t.string "contactGround"
    t.string "contactSatellite"
    t.string "contactEquipment"
    t.string "contactState"
    t.string "contactStep"
    t.string "contactDetail"
    t.integer "contactBeginTimeStamp"
    t.integer "contactEndTimestamp"
    t.integer "contactLatitude"
    t.integer "contactLongitude"
    t.integer "contactAzimuth"
    t.integer "contactElevation"
    t.integer "contactResolution"
    t.integer "contactResolutionStatus"
  end

  create_table "users", force: :cascade do |t|
    t.string "username"
    t.string "password_digest"
  end

end
