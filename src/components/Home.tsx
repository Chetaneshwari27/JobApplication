import React, { useRef } from "react";
import { Button, FormControlLabel, TextField, withStyles, Checkbox, WithStyles, createStyles, Typography, InputAdornment, IconButton, } from "@material-ui/core";
import { AttachFile } from "@material-ui/icons";

interface FormState {
  email: string;
  firstName: string;
  lastName: string;
  cvFile: File | null;
  coverLetterFile: File | null;
  agreement: boolean,
  submitted: boolean
}

interface FormProps extends WithStyles<typeof styles> { }

const styles = createStyles({
  formContainer: {
    margin: '0 auto',
    maxWidth: "400px",
    padding: "15px",
  },
  textField: {
    marginBottom: "30px",
  },
  fileInput: {
    marginBottom: "20px",
  },

});

class Home extends React.Component<FormProps, FormState> {

  cvInputRef = React.createRef<HTMLInputElement>();
  coverLetterInputRef = React.createRef<HTMLInputElement>();


  constructor(props: FormProps) {
    super(props);
    this.state = {
      email: "",
      firstName: "",
      lastName: "",
      cvFile: null,
      coverLetterFile: null,
      agreement: false,
      submitted: false
    };
  }

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    this.setState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  }

  handleCVFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    this.setState({ cvFile: file || null });
  }

  handleCoverLetterFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    this.setState({ coverLetterFile: file !== undefined ? file : null });
  }

  handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const { email, firstName, lastName, cvFile, coverLetterFile, agreement } = this.state;

    console.log("Submitted data:", {
      email,
      firstName,
      lastName,
      cvFile,
      coverLetterFile,
    })

    if (!email || !firstName.trim() || !lastName.trim() || !cvFile || !agreement) {
      this.setState({ submitted: true });
      return;
    }
    const emailRegex = /^\S+@\S+\.\S+$/;
    if (!emailRegex.test(email)) {
      this.setState({ submitted: true });
      return;
    }
    // Reset the form fields
    this.setState({
      email: "",
      firstName: "",
      lastName: "",
      cvFile: null,
      coverLetterFile: null,
      agreement: false,
    });
  };
  handleAgreementChange = (event: React.ChangeEvent<HTMLInputElement>,checked: boolean) => {
    this.setState({ agreement: checked });
  };

  handleAttachCVClick = () => {
    this.cvInputRef.current?.click();
  };

  handleAttachCoverLetterClick = () => {
    this.coverLetterInputRef.current?.click();
  };

  render() {
    const { classes } = this.props;
    const { email, firstName, lastName, agreement, submitted, cvFile } = this.state;

    //         cvInputRef = React.createRef<HTMLInputElement>();
    //   coverLetterInputRef = React.createRef<HTMLInputElement>();

    const isEmailEmpty = email.trim() === "";
    const isFirstNameEmpty = firstName.trim() === "";
    const isLastNameEmpty = lastName.trim() === "";

    return (
      <form className={classes.formContainer} onSubmit={this.handleSubmit} style={{marginTop:"5px" }}>
        <Typography>Email address*</Typography>
        <TextField variant="outlined"
          className={classes.textField}
          label="Email"
          name="email"
          type="text"
          style={{ width: '100%', marginBottom: '5px' }}
          placeholder="Enter your Email address"
          value={email}
          onChange={this.handleInputChange}
          error={
            submitted &&
            (email.trim().length === 0 ||
              !email.match(/^\S+@\S+\.\S+$/))
          }
        />

        <Typography style={{ marginTop: "15px" }}>First Name*</Typography>
        <TextField variant="outlined"
          className={classes.textField}
          label="First Name"
          name="firstName"
          placeholder="Enter your first name"
          value={firstName}
          style={{ width: '100%', marginBottom: '5px' }}
          onChange={this.handleInputChange}
          error={submitted && firstName.trim().length === 0}
        />
        <Typography style={{ marginTop: "15px" }}>Last Name*</Typography>
        <TextField variant="outlined"
          className={classes.textField}
          label="Last Name"
          name="lastName"
          placeholder="Enter your last name"
          value={lastName}
          style={{ width: '100%', marginBottom: '5px' }}
          onChange={this.handleInputChange}
          error={submitted && lastName.trim().length === 0}

        />
        <Typography style={{ marginTop: "15px" }}>Attach CV*</Typography>
        <TextField
          variant="outlined"
          className={classes.fileInput}
          type="text"
          placeholder="Drop here from Desktop or simply click"
          onClick={this.handleAttachCVClick}
          error={submitted && cvFile === null}
          style={{ width: '100%', marginBottom: '5px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton component="span" onClick={this.handleAttachCVClick}>
                  <AttachFile />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <input
          type="file"
          ref={this.cvInputRef}
          onChange={this.handleCVFileChange}
          style={{ display: "none" }}
        /><Typography style={{ color: "grey" }}>.pdf, .doc, .docx</Typography>

        <Typography style={{ marginTop: "15px" }}>Attach Cover Letter(if)</Typography>
        <TextField
          variant="outlined"
          className={classes.fileInput}
          type="text"
          placeholder="Drop here from Desktop or simply click"
          onClick={this.handleAttachCoverLetterClick}
          style={{ width: '100%', marginBottom: '10px' }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  component="span"
                  onClick={this.handleAttachCoverLetterClick}
                >
                  <AttachFile />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <input
          type="file"
          ref={this.coverLetterInputRef}
          onChange={this.handleCoverLetterFileChange}
          accept=".pdf, .doc, .dox, .txt"
          style={{ display: "none" }}
        /><Typography style={{ color: "grey" }}>.pdf, .doc, .docx</Typography>

        <FormControlLabel
          control={
            <Checkbox
              checked={agreement}
              onChange={this.handleAgreementChange}
              required
              style={{ color: agreement ? "lightgreen" : undefined, marginTop: "5px" }}            />
          }
          label="I agree to the Terms & Conditions"
        /><br />
        
        <Button variant="contained" type="submit" disabled={!agreement} style={{color:agreement? "grey" :"lightgreen", backgroundColor: agreement?"lightgreen":"darkgrey", marginLeft: "150px" }}>
          Submit
        </Button>
      </form>
    );
  }
}

export default withStyles(styles)(Home);