import {
  getDatabase,
  ref,
  get,
  query,
  limitToFirst,
  onValue,
  orderByKey,
  startAt,
  endAt,
  startAfter
} from "firebase/database"
import app from "./firebaseConfig"

const database = getDatabase(app)

export { 
  database, 
  ref, 
  get, 
  query, 
  limitToFirst, 
  onValue, 
  orderByKey, 
  startAt, 
  endAt, 
  startAfter 
}
