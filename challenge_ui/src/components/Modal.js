import { React, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';

export default function Modal(props) {

    const styles = {
        input: {
            padding: '10px'
        }
    };

    const [inputs, setInputs] = useState({});

    const generateInputs = () => {
        let inputs = [];
        for (let input of props.modalInfo.inputs) {
            inputs.push(
                <TextField 
                    id={input.id} 
                    key={input.id}
                    label={input.label} 
                    variant='outlined'
                    style={styles.input}
                    value={inputs.id}
                    onChange={handleInputChange}
                />
            )
        }

        return inputs;
    };

    const handleInputChange = (e) => {
        let updatedInputs = { ...inputs };
        updatedInputs[e.target.id] = e.target.value;
        setInputs(updatedInputs);
    };

    return (
        props.modalInfo ? <div>
            <Dialog
                maxWidth={'lg'}
                fullWidth={true}
                open={props.open}
                onClose={props.handleClose}
                aria-labelledby='alert-dialog-title'
                aria-describedby='alert-dialog-description'
            >
                <DialogTitle id='alert-dialog-title'>{props.modalInfo.header}</DialogTitle>
                <DialogContent>
                    <DialogContentText id='alert-dialog-description'>
                        {props.modalInfo.text}  
                        <div style={{textAlign: 'center'}}>
                            {props.responseText}
                        </div>
                    </DialogContentText>
                </DialogContent>
                {generateInputs()}
                <DialogActions>
                    <Button 
                        onClick={() => props.modalInfo.submitAction(inputs)} 
                        color='primary' 
                        autoFocus
                    >
                        {props.modalInfo.submitText}
                    </Button>
                </DialogActions>
            </Dialog>
        </div> : ''
    );
}