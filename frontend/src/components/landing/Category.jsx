import React from 'react'

export default function Category({category}) {
  return (
    <span className="category-item d-flex justify-content-center align-items-center px-2">{category.name}</span>
  )
}
