import { error } from "console";
import { FORM_ERROR } from "final-form";
import React, { useContext } from "react";
import { Form as FinalForm, Field } from "react-final-form";
import { Button, Divider, Form, Grid, Label, Segment } from "semantic-ui-react";
import TextInput from "../../app/common/form/TextInput";
import { IUserFormValues } from "../../app/models/user";
import { RootStoreContext } from "../../app/stores/rootStore";

const LoginForm = () => {
  const rootStore = useContext(RootStoreContext);
  const { login } = rootStore.userStore;

  return (
    <FinalForm
      onSubmit={(values: IUserFormValues) =>
        login(values).catch((error) => ({
          [FORM_ERROR]: error,
        }))
      }
      render={({
        handleSubmit,
        submitting,
        form,
        submitError,
        invalid,
        pristine,
        //only show the errors when the form is not dirty.
        dirtySinceLastSubmit,
      }) => (
        <Segment placeholder>
          <Grid columns={2} relaxed="very" stackable>
            <Grid.Column>
              <Form onSubmit={handleSubmit}>
                <Field
                name="email" component={TextInput} placeholder="Email" />
                <Field
                  name="password"
                  component={TextInput}
                  placeholder="Password"
                  type="password"
                />
                {submitError && (
                  <Label color="red" basic content={submitError.statusText} />
                )}
                <Button primary loading={submitting} content="Login" />
                {/* <pre>{JSON.stringify(form.getState(), null, 2)}</pre> */}
              </Form>
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <Button content="Sign up" icon="signup" size="big" />
            </Grid.Column>
          </Grid>

          <Divider vertical>Or</Divider>
        </Segment>
      )}
    />
  );
};

export default LoginForm;
