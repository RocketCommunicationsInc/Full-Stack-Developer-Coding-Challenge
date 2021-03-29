web: bin/rails server -p ${PORT:-5000} -e $RAILS_ENV
release: bundle exec rails db:migrate
release: bundle exec rails db:seed
