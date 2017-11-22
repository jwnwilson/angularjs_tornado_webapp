#! /bin/bash

echo "Clearing nw_db"
mongo nw_db --host db --eval "db.dropDatabase();"
echo "Cleared nw_db"

colls=( projects pages hobbies blog )

for c in ${colls[@]}
do
  mongoimport --host db -d nw_db --collection $c --type json --file /data/$c.json --jsonArray
  sleep 2
done

echo "Reloaded data"
