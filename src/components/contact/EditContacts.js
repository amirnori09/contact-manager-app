import { useEffect, useContext } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ContactContext } from "../../context/contactContext";
import {toast} from "react-toastify"
import {
  createContact,
  getAllContact,
  updateContact,
} from "../../services/contactService";
import { Spinner } from "..";
import { COMMENT, ORANGE, PURPLE } from "../../helpers/colors";
import { fromPairs } from "lodash";
import { contactSchema } from "../../validations/contactValidation";

import { useImmer } from "use-immer";
const EditContact = () => {
  const { contactId } = useParams();
  const { setContacts, setFilteredContacts, loading, setLoading, groups } =
    useContext(ContactContext);

  const navigate = useNavigate();

  const [contact, setContact] = useImmer({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const { data: contactData } = await getAllContact(contactId);

        setLoading(false);
        setContact(contactData);
      } catch (err) {
        console.log(err);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const submitForm = async (values) => {
    try {
      setLoading(true);
      // Copy State
      // Update State
      // Send Request
      // status == 200 -> do nothing
      // status == error -> setState(copyState)
      const { data, status } = await updateContact(values, contactId);

      /*
       * NOTE
       * 1- forceRender -> setForceRender(true)
       * 2- Send request server
       * 3- Update local state
       * 4- Update local state before sending request to server
       */

      if (status === 200) {
        setLoading(false);
        toast.info("اطلاعات مخاطب با موفقیت ویرایش شد" , {icon:"✅"});
        setContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => c.id === parseInt(contactId)
          );
          draft[contactIndex] = { ...data };
        });
        setFilteredContacts((draft) => {
          const contactIndex = draft.findIndex(
            (c) => c.id === parseInt(contactId)
          );
          draft[contactIndex] = { ...data };
        });

        navigate("/contacts");
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        <Spinner />
      ) : (
        <>
          <section className="p-3">
            <div className="container">
              <div className="row my-2">
                <div className="col text-center">
                  <p className="h4 fw-bold" style={{ color: ORANGE }}>
                    ویرایش مخاطب
                  </p>
                </div>
              </div>
              <hr style={{ backgroundColor: ORANGE }} />
              <div
                className="row p-2 w-75 mx-auto align-items-center"
                style={{ backgroundColor: "#44475a", borderRadius: "1em" }}
              >
                <div className="col-md-8">
                  <Formik
                    initialValues={contact}
                    validationSchema={contactSchema}
                    onSubmit={(values) => {
                      submitForm(values);
                    }}
                  >
                    <Form>
                      <div className="mb-2">
                        <Field
                          type="text"
                          name="fullname"
                          className="form-control"
                          placeholder="نام و نام خانوادگی"
                          // required={true}
                        />
                      </div>
                      <ErrorMessage
                        name="fullname"
                        render={(msg) => (
                          <div className="text-danger">{msg}</div>
                        )}
                      />
                      <div className="mb-2">
                        <Field
                          type="text"
                          name="photo"
                          className="form-control"
                          // required={true}
                          placeholder="آدرس تصویر"
                        />
                        <ErrorMessage
                          name="photo"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          type="number"
                          name="mobile"
                          className="form-control"
                          // required={true}
                          placeholder="شماره موبایل"
                        />
                        <ErrorMessage
                          name="mobile"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          type="email"
                          name="email"
                          className="form-control"
                          // required={true}
                          placeholder="آدرس ایمیل"
                        />
                        <ErrorMessage
                          name="email"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          type="text"
                          name="job"
                          className="from-control"
                          placeholder="شغل"
                        />
                      </div>
                      <div className="mb-2">
                        <Field
                          name="group"
                          as="select"
                          // required={true}
                          className="form-control"
                        >
                          <option value="">انتخاب گروه</option>
                          {groups.length > 0 &&
                            groups.map((group) => (
                              <option key={group.id} value={group.id}>
                                {group.name}
                              </option>
                            ))}
                        </Field>
                        <ErrorMessage
                          name="group"
                          render={(msg) => (
                            <div className="text-danger">{msg}</div>
                          )}
                        />
                      </div>
                      <div className="mx-2">
                        <input
                          type="submit"
                          className="btn"
                          style={{ backgroundColor: PURPLE }}
                          value="ویرایش مخاطب"
                        />
                        <Link
                          to={"/contacts"}
                          className="btn mx-2"
                          style={{ backgroundColor: COMMENT }}
                        >
                          انصراف
                        </Link>
                      </div>
                    </Form>
                  </Formik>
                  {/* <div className="mb-2">
                      <input
        
                        type="submit"
                        className="btn"
                        style={{ backgroundColor: PURPLE }}
                        value="ویرایش مخاطب"
                      />
                      <Link
                        to={"/contacts"}
                        className="btn mx-2"
                        style={{ backgroundColor: COMMENT }}
                      >
                        انصراف
                      </Link>
                    </div> */}
                </div>

                <div className="col-md-4">
                  <img
                    src={contact.photo}
                    className="img-fluid rounded"
                    style={{ border: `1px solid ${PURPLE}` }}
                  />
                </div>
              </div>
            </div>

            <div className="text-center mt-1">
              <img
                src={require("../../assets/man-taking-note.png")}
                height="300px"
                style={{ opacity: "60%" }}
              />
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default EditContact;
