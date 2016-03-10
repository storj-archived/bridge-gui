import React from 'react';
import FileIcon from './fileIcon'

const FileListItem = (props) => {
  return (
    <tr>

      <td>
        <FileIcon mimetype={props.mimetype}/>
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
