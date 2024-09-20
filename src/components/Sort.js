// Sort.js
import React from 'react';
import { ChevronUp, ChevronDown } from 'react-feather';

const Sort = ({ sortConfig, sortUsers, field }) => {
  return (
    <th onClick={() => sortUsers(field)}>
      {field.charAt(0).toUpperCase() + field.slice(1)}{' '}
      {sortConfig.key === field &&
        (sortConfig.direction === 'ascending' ? (
          <ChevronUp size={16} />
        ) : (
          <ChevronDown size={16} />
        ))}
    </th>
  );
};

export default Sort;
