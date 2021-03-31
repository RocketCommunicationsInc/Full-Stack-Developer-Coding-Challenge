# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_30_183722) do

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
  end

  create_table "satellites", force: :cascade do |t|
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
    t.bigint "contactBeginTimestamp"
    t.bigint "contactEndTimestamp"
    t.decimal "contactLatitude"
    t.decimal "contactLongitude"
    t.decimal "contactAzimuth"
    t.decimal "contactElevation"
    t.text "contactResolution"
    t.text "contactResolutionStatus"
  end

  create_table "users", force: :cascade do |t|
    t.text "email"
    t.text "username"
    t.text "password_digest"
  end

end
