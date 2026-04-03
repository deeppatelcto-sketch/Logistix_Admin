// import React, { useEffect, useState } from "react";
// import {
//   MenuItem,
//   TextField,
//   Typography,
//   FormControl,
//   Select,
//   CircularProgress
// } from "@mui/material";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   createSupportTicket,
//   getAllCustomers,
//   getAllCourierCompanies
// } from "../../../redux/supportTicketRelated/supportHandle";
// import styled from "styled-components";

// const AddSupportTicket = () => {
//   const dispatch = useDispatch();
//   const { customers, couriers } = useSelector((state) => state.support);

//   const [formData, setFormData] = useState({
//     userType: "",
//     customerId: "",
//     courierCompanyId: "",
//     category: "",
//     subCategory: "",
//     subject: "",
//     description: "",
//     file: null,
//   });

//   const [loading, setLoading] = useState(false);
//   const [message, setMessage] = useState("");
//   const [errors, setErrors] = useState({});

//   useEffect(() => {
//     dispatch(getAllCustomers());
//     dispatch(getAllCourierCompanies());
//   }, [dispatch]);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: "" }));
//   };

//   const handleFileChange = (e) => {
//     setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
//   };

//   const validate = () => {
//     const err = {};
//     if (!formData.userType) err.userType = "User Type is required";
//     if (formData.userType === "customer" && !formData.customerId) err.customerId = "Customer is required";
//     if (formData.userType === "courier" && !formData.courierCompanyId) err.courierCompanyId = "Courier company is required";
//     if (!formData.category.trim()) err.category = "Category is required";
//     if (!formData.subCategory.trim()) err.subCategory = "Sub-category is required";
//     if (!formData.subject.trim()) err.subject = "Subject is required";
//     if (!formData.description.trim()) err.description = "Description is required";
//     setErrors(err);
//     return Object.keys(err).length === 0;
//   };

//   const handleSubmit = () => {
//     if (!validate()) return;

//     setLoading(true);
//     const data = new FormData();
//     Object.entries(formData).forEach(([key, val]) => {
//       if (val) data.append(key, val);
//     });

//     dispatch(createSupportTicket(data))
//       .then(() => {
//         setMessage("Support ticket submitted successfully ✅");
//         setFormData({
//           userType: "",
//           customerId: "",
//           courierCompanyId: "",
//           category: "",
//           subCategory: "",
//           subject: "",
//           description: "",
//           file: null,
//         });
//       })
//       .catch(() => {
//         setMessage("❌ Failed to submit ticket");
//       })
//       .finally(() => {
//         setLoading(false);
//       });
//   };

//   return (
//     <StyledContainer>
//       <StyledForm>
//         <Title>📩 Add Support Ticket</Title>

//         <InputRow>
//           <StyledFormControl error={!!errors.userType}>
//             <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: 1 }}>
//               User Type
//             </Typography>
//             <Select
//               name="userType"
//               value={formData.userType}
//               onChange={handleChange}
//               size="small"
//               fullWidth
//             >
//               <MenuItem value="customer">Customer</MenuItem>
//               <MenuItem value="courier">Courier Company</MenuItem>
//             </Select>
//             {errors.userType && <ErrorText>{errors.userType}</ErrorText>}
//           </StyledFormControl>

//           {formData.userType === "customer" && (
//             <StyledFormControl error={!!errors.customerId}>
//               <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: 1 }}>
//                 Customer
//               </Typography>
//               <Select
//                 name="customerId"
//                 value={formData.customerId}
//                 onChange={handleChange}
//                 size="small"
//                 fullWidth
//               >
//                 {customers.map((c) => (
//                   <MenuItem key={c._id} value={c._id}>
//                     {c.name}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {errors.customerId && <ErrorText>{errors.customerId}</ErrorText>}
//             </StyledFormControl>
//           )}

//           {formData.userType === "courier" && (
//             <StyledFormControl error={!!errors.courierCompanyId}>
//               <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: 1 }}>
//                 Courier Company
//               </Typography>
//               <Select
//                 name="courierCompanyId"
//                 value={formData.courierCompanyId}
//                 onChange={handleChange}
//                 size="small"
//                 fullWidth
//               >
//                 {couriers.map((c) => (
//                   <MenuItem key={c._id} value={c._id}>
//                     {c.companyName}
//                   </MenuItem>
//                 ))}
//               </Select>
//               {errors.courierCompanyId && (
//                 <ErrorText>{errors.courierCompanyId}</ErrorText>
//               )}
//             </StyledFormControl>
//           )}
//         </InputRow>

//         <InputRow>
//           <div style={{ flex: 1 }}>
//             <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: 1 }}>
//               Category
//             </Typography>
//             <StyledTextField
//               name="category"
//               value={formData.category}
//               onChange={handleChange}
//               error={!!errors.category}
//               helperText={errors.category}
//               size="small"
//               fullWidth
//             />
//           </div>

//           <div style={{ flex: 1 }}>
//             <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: 1 }}>
//               Sub Category
//             </Typography>
//             <StyledTextField
//               name="subCategory"
//               value={formData.subCategory}
//               onChange={handleChange}
//               error={!!errors.subCategory}
//               helperText={errors.subCategory}
//               size="small"
//               fullWidth
//             />
//           </div>
//         </InputRow>

//         <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: 1 }}>
//           Subject
//         </Typography>
//         <StyledTextField
//           name="subject"
//           value={formData.subject}
//           onChange={handleChange}
//           error={!!errors.subject}
//           helperText={errors.subject}
//           size="small"
//           fullWidth
//         />

//         <Typography sx={{ fontWeight: 600, fontSize: "16px", mt: 3, mb: 1 }}>
//           Description
//         </Typography>
//         <StyledTextField
//           name="description"
//           multiline
//           rows={4}
//           value={formData.description}
//           onChange={handleChange}
//           error={!!errors.description}
//           helperText={errors.description}
//           fullWidth
//         />

//         <InputRow>
//           <div style={{ flex: 1 }}>
//             <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: 1 }}>
//               Upload File
//             </Typography>
//             <input type="file" onChange={handleFileChange} />
//             {formData.file && (
//               <Typography variant="caption" sx={{ mt: 1 }}>
//                 {formData.file.name}
//               </Typography>
//             )}
//           </div>
//         </InputRow>

//         <StyledButton type="button" onClick={handleSubmit} disabled={loading}>
//           {loading ? <CircularProgress size={24} color="inherit" /> : "Submit Ticket"}
//         </StyledButton>

//         {message && <MessageText error={message.includes("❌")}>{message}</MessageText>}
//       </StyledForm>
//     </StyledContainer>
//   );
// };

// export default AddSupportTicket;

// // ------------------------- Styled Components -------------------------

// const StyledContainer = styled.div`
//   flex: 1;
//   padding: 2rem;
//   background: #ffffff;
//   min-height: 100vh;
//   overflow-y: auto;

//   @media (max-width: 768px) {
//     padding: 1rem;
//   }
// `;

// const StyledForm = styled.form`
//   background: #ffffff;
//   padding: 60px;
//   border-radius: 12px;
//   max-width: 1200px;
//   margin: 0 auto;
//   display: flex;
//   flex-direction: column;

//   @media (max-width: 768px) {
//     padding: 30px 20px;
//   }
// `;

// const Title = styled.h2`
//   text-align: center;
//   margin-bottom: 30px;
//   font-weight: 600;
//   color: #343a40;
// `;

// const InputRow = styled.div`
//   display: flex;
//   gap: 40px;
//   margin-bottom: 20px;
//   flex-wrap: wrap;

//   @media (max-width: 768px) {
//     flex-direction: column;
//     gap: 20px;
//   }
// `;

// const StyledTextField = styled(TextField)`
//   flex: 1;
// `;

// const StyledFormControl = styled(FormControl)`
//   flex: 1;
// `;

// const StyledButton = styled.button`
//   margin-top: 40px;
//   background: #339af0;
//   color: white;
//   font-weight: 600;
//   padding: 12px;
//   border: none;
//   border-radius: 6px;
//   cursor: pointer;
//   transition: background 0.3s ease;

//   &:hover:not(:disabled) {
//     background: #1c7ed6;
//   }

//   &:disabled {
//     background: #74c0fc;
//     cursor: not-allowed;
//   }
// `;

// const MessageText = styled.p`
//   margin-top: 20px;
//   text-align: center;
//   font-weight: 500;
//   color: ${({ error }) => (error ? '#e03131' : '#2f9e44')};
// `;

// const ErrorText = styled.span`
//   color: red;
//   font-size: 0.8rem;
//   margin-top: 4px;
// `;




import React, { useEffect, useState } from "react";
import {
  MenuItem,
  TextField,
  Typography,
  FormControl,
  Select,
  CircularProgress
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  createSupportTicket,
  getAllCourierCompanies
} from "../../../redux/supportTicketRelated/supportHandle";
import { getAllCust } from "../../../redux/custRelated/custHandle";
import styled from "styled-components";

const AddSupportTicket = () => {
  const dispatch = useDispatch();

  // ✅ Customer list from cust reducer
  const { custList } = useSelector((state) => state.cust);

  // ✅ Courier list from support reducer
  const { couriers } = useSelector((state) => state.support);

  const [formData, setFormData] = useState({
    userType: "",
    customerId: "",
    courierCompanyId: "",
    category: "",
    subCategory: "",
    subject: "",
    description: "",
    file: null,
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    dispatch(getAllCust());
    dispatch(getAllCourierCompanies());
  }, [dispatch]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, file: e.target.files[0] }));
  };

  const validate = () => {
    const err = {};
    if (!formData.userType) err.userType = "User Type is required";
    if (formData.userType === "customer" && !formData.customerId)
      err.customerId = "Customer is required";
    if (formData.userType === "courier" && !formData.courierCompanyId)
      err.courierCompanyId = "Courier company is required";
    if (!formData.category.trim()) err.category = "Category is required";
    if (!formData.subCategory.trim())
      err.subCategory = "Sub-category is required";
    if (!formData.subject.trim()) err.subject = "Subject is required";
    if (!formData.description.trim())
      err.description = "Description is required";
    setErrors(err);
    return Object.keys(err).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    setLoading(true);
    const data = new FormData();
    Object.entries(formData).forEach(([key, val]) => {
      if (val) data.append(key, val);
    });

    dispatch(createSupportTicket(data))
      .then(() => {
        setMessage("Support ticket submitted successfully ✅");
        setFormData({
          userType: "",
          customerId: "",
          courierCompanyId: "",
          category: "",
          subCategory: "",
          subject: "",
          description: "",
          file: null,
        });
      })
      .catch(() => {
        setMessage("❌ Failed to submit ticket");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <StyledContainer>
      <StyledForm>
        <Title>📩 Add Support Ticket</Title>

        <InputRow>
          <StyledFormControl error={!!errors.userType}>
            <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: 1 }}>
              User Type
            </Typography>
            <Select
              name="userType"
              value={formData.userType}
              onChange={handleChange}
              size="small"
              fullWidth
            >
              <MenuItem value="customer">Customer</MenuItem>
              <MenuItem value="courier">Courier Company</MenuItem>
            </Select>
            {errors.userType && <ErrorText>{errors.userType}</ErrorText>}
          </StyledFormControl>

          {formData.userType === "customer" && (
            <StyledFormControl error={!!errors.customerId}>
              <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: 1 }}>
                Customer
              </Typography>
              <Select
                name="customerId"
                value={formData.customerId}
                onChange={handleChange}
                size="small"
                fullWidth
              >
                {custList?.map((c) => (
                  <MenuItem key={c._id} value={c._id}>
                 {c.firstName || ""} {c.lastName || ""} ({c.phoneNumber || ""})

                  </MenuItem>
                ))}
              </Select>
              {errors.customerId && <ErrorText>{errors.customerId}</ErrorText>}
            </StyledFormControl>
          )}

          {formData.userType === "courier" && (
            <StyledFormControl error={!!errors.courierCompanyId}>
              <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: 1 }}>
                Courier Company
              </Typography>
              <Select
                name="courierCompanyId"
                value={formData.courierCompanyId}
                onChange={handleChange}
                size="small"
                fullWidth
              >
                {couriers?.map((c) => (
                  <MenuItem key={c._id} value={c._id}>
                    {c.companyName}
                  </MenuItem>
                ))}
              </Select>
              {errors.courierCompanyId && (
                <ErrorText>{errors.courierCompanyId}</ErrorText>
              )}
            </StyledFormControl>
          )}
        </InputRow>

        <InputRow>
          <div style={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: 1 }}>
              Category
            </Typography>
            <StyledTextField
              name="category"
              value={formData.category}
              onChange={handleChange}
              error={!!errors.category}
              helperText={errors.category}
              size="small"
              fullWidth
            />
          </div>

          <div style={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: 1 }}>
              Sub Category
            </Typography>
            <StyledTextField
              name="subCategory"
              value={formData.subCategory}
              onChange={handleChange}
              error={!!errors.subCategory}
              helperText={errors.subCategory}
              size="small"
              fullWidth
            />
          </div>
        </InputRow>

        <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: 1 }}>
          Subject
        </Typography>
        <StyledTextField
          name="subject"
          value={formData.subject}
          onChange={handleChange}
          error={!!errors.subject}
          helperText={errors.subject}
          size="small"
          fullWidth
        />

        <Typography sx={{ fontWeight: 600, fontSize: "16px", mt: 3, mb: 1 }}>
          Description
        </Typography>
        <StyledTextField
          name="description"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleChange}
          error={!!errors.description}
          helperText={errors.description}
          fullWidth
        />

        <InputRow>
          <div style={{ flex: 1 }}>
            <Typography sx={{ fontWeight: 600, fontSize: "16px", mb: 1 }}>
              Upload File
            </Typography>
            <input type="file" onChange={handleFileChange} />
            {formData.file && (
              <Typography variant="caption" sx={{ mt: 1 }}>
                {formData.file.name}
              </Typography>
            )}
          </div>
        </InputRow>

        <StyledButton type="button" onClick={handleSubmit} disabled={loading}>
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            "Submit Ticket"
          )}
        </StyledButton>

        {message && (
          <MessageText error={message.includes("❌")}>{message}</MessageText>
        )}
      </StyledForm>
    </StyledContainer>
  );
};

export default AddSupportTicket;

// ------------------------- Styled Components -------------------------

const StyledContainer = styled.div`
  flex: 1;
  padding: 2rem;
  background: #ffffff;
  min-height: 100vh;
  overflow-y: auto;

  @media (max-width: 768px) {
    padding: 1rem;
  }
`;

const StyledForm = styled.form`
  background: #ffffff;
  padding: 60px;
  border-radius: 12px;
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  @media (max-width: 768px) {
    padding: 30px 20px;
  }
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 30px;
  font-weight: 600;
  color: #343a40;
`;

const InputRow = styled.div`
  display: flex;
  gap: 40px;
  margin-bottom: 20px;
  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    gap: 20px;
  }
`;

const StyledTextField = styled(TextField)`
  flex: 1;
`;

const StyledFormControl = styled(FormControl)`
  flex: 1;
`;

const StyledButton = styled.button`
  margin-top: 40px;
  background: #339af0;
  color: white;
  font-weight: 600;
  padding: 12px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background 0.3s ease;

  &:hover:not(:disabled) {
    background: #1c7ed6;
  }

  &:disabled {
    background: #74c0fc;
    cursor: not-allowed;
  }
`;

const MessageText = styled.p`
  margin-top: 20px;
  text-align: center;
  font-weight: 500;
  color: ${({ error }) => (error ? "#e03131" : "#2f9e44")};
`;

const ErrorText = styled.span`
  color: red;
  font-size: 0.8rem;
  margin-top: 4px;
`;

