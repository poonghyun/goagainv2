# encoding: UTF-8
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

ActiveRecord::Schema.define(version: 20141006175544) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "businesses", force: true do |t|
    t.string   "name",       null: false
    t.string   "category",   null: false
    t.integer  "price",      null: false
    t.datetime "created_at"
    t.datetime "updated_at"
    t.string   "avatar_url"
    t.float    "x_coord"
    t.float    "y_coord"
  end

  create_table "photos", force: true do |t|
    t.string   "fp_url",     null: false
    t.integer  "review_id",  null: false
    t.string   "caption"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "photos", ["review_id"], name: "index_photos_on_review_id", using: :btree

  create_table "reviews", force: true do |t|
    t.text     "content",                     null: false
    t.integer  "stars",                       null: false
    t.integer  "user_id",                     null: false
    t.integer  "business_id",                 null: false
    t.boolean  "go_again",    default: false
    t.datetime "created_at"
    t.datetime "updated_at"
  end

  add_index "reviews", ["business_id"], name: "index_reviews_on_business_id", using: :btree
  add_index "reviews", ["user_id"], name: "index_reviews_on_user_id", using: :btree

  create_table "users", force: true do |t|
    t.string   "username",        null: false
    t.string   "password_digest", null: false
    t.string   "session_token",   null: false
    t.string   "avatar_url"
    t.text     "about_me"
    t.datetime "created_at"
    t.datetime "updated_at"
  end

end
