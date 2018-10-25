import React, { Component } from 'react';
import PropTypes from 'prop-types';

// import Button from '../button/Button';
import Form from '../Form/Form';

import Actions from './Actions/Actions';
import './tables.css'
import Dialog from "../Dialog/Dialog";

class Table extends Component {

  static propTypes = {
    header: PropTypes.array,
    data: PropTypes.array
  };

  constructor(props){
    super(props);

    this.state = ({
      data: this.props.data,
      sortBy: null, //schema.id
      descending: false,
      edit: null, //[row index, scheme.id]
      dialog: null // {type, idx}
    });

    this._sort = this._sort.bind(this);
    this._showEditor = this._showEditor.bind(this);
    this._save = this._save.bind(this);
    this._fireDataChange = this._fireDataChange.bind(this);
    this._actionClick = this._actionClick.bind(this);
    this._deleteConfirmationClick = this._deleteConfirmationClick.bind(this);

    this._closeDialog = this._closeDialog.bind(this);
    this._saveDataDialog = this._saveDataDialog.bind(this);
    this._renderDialog = this._renderDialog.bind(this);
    this._renderDialog = this._renderDialog.bind(this);
  }

  _fireDataChange(data){
    this.props.onDataChange(data);
  }

  _sort(key){
    let data = Array.from(this.state.data);
    const descending = this.state.sortBy === key && !this.state.descending;

    // data.sort(function (a,b) {
    //   return descending
    //     ? (a[column] < b[column] ? 1 : -1)
    //     : (a[column] > b[column] ? 1 : -1)
    //
    // });
    this.setState({
        data: data,
        sortBy: key,
        descending: descending
    });
    this._fireDataChange(data);
  }

  _showEditor(e){
    this.setState({
      edit: {
        row: parseInt(e.target.dataset.row , 10),
        key: e.target.dataset.key,
    }});
  }

  _save(e){
    e.preventDefault();
    const value = this.refs.input.getValue();
    let data = Array.from(this.state.data);
    data[this.state.edit.row][this.state.edit.key] = value;
    this.setState({
        edit: null,
        data: data,
    });

    this._fireDataChange(data);
  }

  _actionClick(rowidx, action){
    this.setState({
        dialog: {
          type: action,
          idx: rowidx
        }
    });
  }

  _deleteConfirmationClick(action){
    if(action === 'dismiss'){
      this._closeDialog();
      return;
    }
    let data = Array.from(this.state.data);
    data.splice(this.state.dialog.idx, 1);
    this.setState({
        dialog: null,
        data: data,
    });
    this._fireDataChange(data);
  }

  _closeDialog(){
    this.setState({
        dialog: null,
    })
  }
  _saveDataDialog(action){
    if(action === 'dismiss'){
      this._closeDialog();
      return;
    }
    let data = Array.from(this.state.data);
    data[this.state.dialog.idx] = this.refs.form.getData();
    this.setState({
        dialog: null,
        data: data,
    });
    this._fireDataChange(data);
  }

  /*life cycle*/

  componentWillReceiveProps(next) {
    this.setState({
        data: next.initialData
    })
  }


  /*render`s methods*/
    _renderDialog(){
      if(!this.state.dialog){
        return null;
      }

      switch (this.state.dialog.type) {
          case 'delete':
            return this._renderDeleteDialog();
          case 'info':
            return this._renderFormDialog();
          case 'edit':
            return this._renderFormDialog();

      }
    }
    _renderDeleteDialog(){
      const first = this.state.data[this.state.dialog.idx];
      const nameguess = first[Object.keys(first)[0]];
      return(
          <Dialog
              modal={true}
              header="Confirm label"
              confirmLabel="Delete"
              onAction={this._deleteConfirmationClick.bind(this)}
          >
              {`Are you sure want to delete ${nameguess}?`}
          </Dialog>
      )
    }

    _renderFormDialog(){
      return(
        <Dialog
            modal={true}
            header={readonly ? 'Item info' : 'Edit item'}
            confirmLabel={readonly ? 'ok'  : 'Save'}
            hasCancel={!readonly}
            onAction={this._saveDataDialog.bind(this)}
        >
          <Form
              ref="form"
              fields={this.props.schema}
              initialData={this.state.data[this.state.dialog.idx]}
              readOnly={readOnly}

          />

        </Dialog>
      )
    }
    _renderTable(){
      return( <div className="tables">
              <table>
                <thead onClick={this.sort_on_click}>
                <tr>
                  {this.props.header.map(function(title, key){
                    if( this.state.sortBy === key){
                      title += this.state.descending ? '\u2191' : '\u2193';
                    }
                    return <th key={key}>{title}</th>;
                  }, this)}
                </tr>
              </thead>

              <tbody >
                {this.renderSearch()}
                {this.state.data.map(function(title, rowKey) {
                  return  <tr key={rowKey} onDoubleClick={this.inputClick}>{
                    title.map(function(title,key){
                      let edit = this.state.edit;
                      if(edit && edit.row === rowKey && edit.cell === key){
                        return  <th key={key}>
                                    <form onSubmit={this.save}>
                                      <input defaultValue={title} type="text"/>
                                    </form>
                                </th>
                      }
                      return <th rowkey={rowKey} key={key} >{title}</th>
                    }, this)}
                    <Actions onAction={ type => alert(type)} />
                  </tr>
                }, this)}
              </tbody>
              </table>
                </div>
      )
    }
    render() {

      return(
          <div className="Excel">
              {this._renderTable()}
              {this._renderDialog()}
          </div>
      )

      // return (
      //   <div>
      //     <div className="toolbar">
      //       <Button onClick={this.togleSearch}>
      //         {this.state.search ? 'Enaf' : `Let\`s search`}
      //       </Button>
      //       <div className="export">
      //         <Button href="data.json" onClick={this._download.bind(this,'json')}>
      //           Export JSON
      //         </Button>
      //         <Button href="data.csv" onClick={this._download.bind(this,'csv')}>
      //           Export CSV
      //         </Button>
      //       </div>
      //     </div>
      //     <div className="tables">
      //       <table>
      //         <thead onClick={this.sort_on_click}>
      //           <tr>
      //             {this.props.header.map(function(title, key){
      //               if( this.state.sortBy === key){
      //                 title += this.state.descending ? '\u2191' : '\u2193';
      //               }
      //               return <th key={key}>{title}</th>;
      //             }, this)}
      //           </tr>
      //         </thead>
      //
      //         <tbody >
      //           {this.renderSearch()}
      //           {this.state.data.map(function(title, rowKey) {
      //             return  <tr key={rowKey} onDoubleClick={this.inputClick}>{
      //                       title.map(function(title,key){
      //                         let edit = this.state.edit;
      //                         if(edit && edit.row === rowKey && edit.cell === key){
      //                           return  <th key={key}>
      //                                       <form onSubmit={this.save}>
      //                                         <input defaultValue={title} type="text"/>
      //                                       </form>
      //                                   </th>
      //                         }
      //                         return <th rowkey={rowKey} key={key} >{title}</th>
      //                       }, this)}
      //                       <Actions onAction={ type => alert(type)} />
      //                     </tr>
      //           }, this)}
      //         </tbody>
      //       </table>
      //     </div>
      //     <Form
      //       // readOnly={true}
      //       fields = {[
      //         {
      //           label: 'Rating',
      //           type: 'rating',
      //           id: "ratname",
      //           max: 7,
      //         },
      //         {
      //           label: 'Greeting',
      //           id: 'freetext',
      //         }
      //       ]}
      //
      //       initialData={
      //         {
      //           ratname: 4,
      //           freetext: 'Hello'
      //         }
      //       }
      //
      //     />
      //   </div>
      // );
    }
}

export default Table;
