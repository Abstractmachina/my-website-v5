import React, { PropsWithChildren } from 'react';


type Props = {
}

const Card = (props:Props & PropsWithChildren) => {
  return (
    <div className="w-full bg-zinc-400 bg-opacity-25 p-8 rounded-md shadow-md">
      {props.children}
    </div>
  )
}

export default Card;