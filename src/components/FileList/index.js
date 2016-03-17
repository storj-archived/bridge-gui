import React from 'react';
import FileListItem from './fileListItem';

const FileList = (props) => {
  // const styles = require('./BucketList.scss');

  function renderFileListItems(files) {
    if(files && files.length && files.length > 0) {
      return files.map((file) => {
        return (
          <FileListItem
            key     = {file.id}
            {...file}
          />
        );
        //onClick = {() => props.onFileClick(file.id)}
      });
    } else {
      return (
        <tr className="text-center"><td colSpan="3"><span>Ready to Store Objects...</span></td></tr>
      );
    }
  }

  return (
    <table className="table table-hover table-files">
      <thead>
        <tr>
          <th>Name</th>
          <th>Size</th>
          <th>Type</th>
        </tr>
      </thead>
      <tbody>
        {renderFileListItems(props.files)}
      </tbody>
    </table>
  );
};

FileList.propTypes = {
  files  : React.PropTypes.array.isRequired,
};


export default FileList;
