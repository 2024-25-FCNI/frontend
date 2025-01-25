import React from 'react'
import TermekPublic from './TermekPublic'

function TermekekPublic(props) {
  return (
    <div className='row  cols-1 row-cols-sm-2 row-cols-md-3  g-4'>{
      props.termekek.map(termek=>{
        return <TermekPublic termek={termek} key={termek.id}/>
      })}</div>
  )
}

export default TermekekPublic