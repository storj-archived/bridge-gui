import React, { PropTypes } from 'react';
import FileListItem from 'components/file-list/file-list-item';

const FileList = (props) => {
  // const styles = require('./bucket-list.scss');

  function renderFileListItems(files) {
    if (files && files.length && files.length > 0) {
      return files.map((file) => {
        return (
          <FileListItem
            fileSelectAction = {props.fileSelectAction}
            key              = {file.id}
            {...file}
          />
        );
        // onClick = {() => props.onFileClick(file.id)}
      });
    }
    return (
      <tr className="text-center">
        <td colSpan="3">
          <span> Ready to store objects. Read the
            <a href="https://storj.readme.io/"> Get Started </a>
            tutorial, or go straight to the
            <a href="https://storj.io/api.html"> Storj API </a>.
          </span>
        </td>
      </tr>
    );
  }

  return (
    <table className="table table-hover table-files">
      <thead>
        <tr>
          <th> Name </th>
          <th> Size </th>
          <th> Type </th>
        </tr>
      </thead>
      <tbody>
        {renderFileListItems(props.files)}
      </tbody>
    </table>
  );
};

FileList.propTypes = {
  files            : PropTypes.array.isRequired,
  fileSelectAction : PropTypes.func // ???
};

export default FileList;
