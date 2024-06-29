import Container from "./components/Container"
import { Formik, Field, Form, ErrorMessage } from 'formik';
import flexSchema from "./schemas/colorSchema";
import Button from "./components/Button";
import { nearestColor } from "./utils/hexToBeads";
import { useEffect, useState } from "react";
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { Alert } from "@mui/material";

function App() {
  const [beadColors, setBeadColors] = useState<{ id: string, name: string, hex: string }[]>([])
  const [colorError, setColorError] = useState<null | string>(null)
  useEffect(() => {
    const timeId = setTimeout(() => {
      setColorError(null)
    }, 3000)
    return () => {
      clearTimeout(timeId)
    }
  }, [colorError])
  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Id', width: 150 },
    { field: 'hex', headerName: 'Hex', width: 150 },
    { field: 'name', headerName: 'Name', width: 150 },
  ];
  return (
    <Container>
      <Formik
        initialValues={{ color: '' }}
        validationSchema={flexSchema}
        onSubmit={(values) => {
          const closestColor = nearestColor(values.color)
          const newBeads = new Set(beadColors)
          if (newBeads.has(closestColor)) {
            setColorError(`Color with id: ${closestColor.id} hex: ${closestColor.hex} and name: ${closestColor.name} is already in the list.`)
          }
          newBeads.add(closestColor)
          setBeadColors([...newBeads])
        }}
      >
        <Form>
          <div className="mb-4">
            <Field placeholder="Color" className='text-gray-901 text-2xl rounded-lg block w-full p-2.5 border border-gray-100 bg-gray-100' name="color" type="text" />
            <ErrorMessage name="color" />
          </div>
          <div className="mb-4">
            <Button type="submit"><p className="text-3xl">Submit</p></Button>
          </div>
        </Form>
      </Formik>
      <div style={{ height: 700, width: '100%' }}>
        <DataGrid rows={beadColors} columns={columns} />
      </div>
      {colorError && <Alert severity="warning">{colorError}</Alert>}
    </Container>
  )
}

export default App
