import React from 'react'

function TestVisualisation(){
  const members = Array.from("ABCDEFGHIJKLMNOP")
  
  return (
    <>
    {members.map(el=><p key={el}>{el}</p>)}
    </>
  )
}

export default TestVisualisation