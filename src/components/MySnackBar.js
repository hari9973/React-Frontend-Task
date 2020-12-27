import React from 'react';
import {useSnackbar} from 'notistack';
import { connect } from "react-redux";

function MySnackBar(props){

    React.useEffect(() => {
        console.log("hi");
        if(props.error !== ""){
            console.log(props.error);
            handleClickVariant(props.error,'error')
        }
        if(props.message !== "")
            handleClickVariant(props.message,'success')
      });

    const { enqueueSnackbar } = useSnackbar();
    const handleClickVariant = (msg,variant) => () => {
      // variant could be success, error, warning, info, or default
      enqueueSnackbar(msg, { variant });
    };
    return (
      <React.Fragment>
          <button onClick={handleClickVariant("works",'info')}/>
      </React.Fragment>
    );
  }

  const mapStateToProps = (state) => {
    return {
      error: state.error,
      message: state.message,
    };
  };

  export default connect(mapStateToProps)(MySnackBar);