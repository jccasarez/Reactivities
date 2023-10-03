import { Form, Formik } from "formik";
import { observer } from "mobx-react-lite";
import { Button } from "semantic-ui-react";
import { useStore } from "../../app/stores/store";
import MyTextInput from "../../app/common/form/MyTextInput";
import MyTextArea from "../../app/common/form/MyTextArea";
import * as Yup from 'yup';

interface Props {
    setEditMode: (editMode: boolean) => void;
}

export default observer(function ProfileEditForm({setEditMode}: Props) {
    const {profileStore: {profile, updateProfile}} = useStore();

    return (
                    <Formik 
                        initialValues={{displayName: profile?.displayName, bio: profile?.bio}} 
                        onSubmit={values => {
                            updateProfile(values).then(() => {
                                setEditMode(false);
                            })
                        }}
                        validationSchema={Yup.object({
                            displayName: Yup.string().required()
                        })}
                    >
                        {({isValid, isSubmitting, dirty}) => (
                            <Form className='ui form' autoComplete='off'>
                                <MyTextInput name='displayName' placeholder='Display Name' />
                                <MyTextArea rows={3} placeholder='Add your bio' name='bio' />
                                <Button 
                                    disabled={!dirty || !isValid}
                                    loading={isSubmitting} 
                                    floated='right' 
                                    positive 
                                    type='submit' 
                                    content='Update Profile' 
                                />  
                            </Form>
                        )}
                    </Formik>
    )
})