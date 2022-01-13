import React, { ReactChild, ReactChildren, useContext, useEffect, useState } from 'react'
import { useRealmApp } from './realm'

export interface MongoDBContextInterface {
  db: Realm.Services.MongoDBDatabase | null
}

const MongoDBContext = React.createContext<MongoDBContextInterface | null>(null)

interface AuxProps {
  children: ReactChild | ReactChildren;
}

const MongoDB = ({ children }: AuxProps) => {
  const { user } = useRealmApp()
  const [db, setDb] = useState<Realm.Services.MongoDBDatabase | null>(null)

  useEffect(() => {
    if (user !== null) {
      const realmService = user.mongoClient(
        import.meta.env.VITE_REACT_APP_REALM_SERVICE_NAME
      )
      setDb(realmService.db(import.meta.env.VITE_REACT_APP_DB_NAME))
    }
  }, [user])

  return (
    <MongoDBContext.Provider
      value={{
        db,
      }}
    >
      {children}
    </MongoDBContext.Provider>
  )
}

export const useMongoDB = () => {
  const mdbContext = useContext(MongoDBContext)
  if (mdbContext == null) {
    throw new Error('useMongoDB() called outside of a MongoDB?')
  }
  return mdbContext
}

export default MongoDB
