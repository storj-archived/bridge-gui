import React from 'react';

const FileListItem = (props) => {
  return (
    <tr>

      <td>
        <i></i>
        <span>{props.filename}</span>
      </td>

      <td>
        <span>{props.size}B</span>
      </td>

      <td>
        <span>{props.mimetype}</span>
      </td>

    </tr>
  );
};

export default FileListItem;
