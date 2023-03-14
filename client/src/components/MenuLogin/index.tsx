import React, { useEffect } from 'react'
import { useAccount, useConnect } from 'wagmi'
import './styles.scss'

type Props = {}

const MenuLogin = (props: Props) => {

  const { connect, connectors, error, isLoading, pendingConnector } =
  useConnect()

  return (
    <div className='menuLogin'>
       {connectors.map((connector) => (
        <button className='menuLogin__item'
          disabled={!connector.ready}
          key={connector.id}
          onClick={() => connect({ connector })}
        >
          {connector.name.toUpperCase()}
          {!connector.ready && ' (unsupported)'}
          {isLoading &&
            connector.id === pendingConnector?.id &&
            ' (connecting)'}
        </button>
      ))}
 
      {/* {error && <div>{error.message}</div>} */}
    </div>
  )
}

export default MenuLogin