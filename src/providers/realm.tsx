import React, { ReactChild, ReactChildren, useContext, useState } from 'react'
import * as RealmWeb from 'realm-web'

interface RealmAppContextInterface {
  logIn: Function
  logOut: Function
  user: RealmWeb.User | null
  anonymousIn: Function
}

const RealmAppContext = React.createContext<RealmAppContextInterface | null>(null)

interface AuxProps {
  children: ReactChild | ReactChildren
}

const RealmApp = ({ children }: AuxProps) => {
  const REALM_APP_ID = import.meta.env.VITE_REACT_APP_REALM_APP_ID
  const app = new RealmWeb.App({ id: REALM_APP_ID })
  const [user, setUser] = useState<RealmWeb.User | null>(null)

  const anonymousIn = async () => {
    const credentials = RealmWeb.Credentials.anonymous()
    try {
      await app.logIn(credentials)
      setUser(app.currentUser)
      return app.currentUser
    } catch (e) {
      setUser(null)
      return null
    }
  }

  const logIn = async (email: string, password: string) => {
    const credentials = RealmWeb.Credentials.emailPassword(email, password)
    try {
      await app.logIn(credentials)
      setUser(app.currentUser)
      return app.currentUser
    } catch (e) {
      setUser(null)
      return null
    }
  }

  const logOut = () => {
    if (user !== null) {
      app.currentUser?.logOut()
      setUser(null)
    }
  }

  return (
    <RealmAppContext.Provider value={{
      logIn,
      logOut,
      user,
      anonymousIn
    }}
    >
      {children}
    </RealmAppContext.Provider>
  )
}

export const useRealmApp = () => {
  const realmContext = useContext(RealmAppContext)
  if (realmContext == null) {
    throw new Error('useRealmApp() called outside of a RealmApp?')
  }
  return realmContext
}

export default RealmApp
