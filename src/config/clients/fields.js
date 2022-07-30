import { OBJECT_ID } from "../../utils/fieldsTypes";
import { getNeededFields } from "../../utils/fields";

const fields = [
  {
    key: "herba_id",
    label: "HerbaID",
    sortable: false,
    filterable: true,
    type: OBJECT_ID,
    tdClass: "align-middle",
  },
  {
    key: "name",
    label: "Nombre",
    sortable: true,
    filterable: true,
  },
  {
    key: "last_name",
    label: "Apellido",
    sortable: true,
    filterable: true,
  },
  {
    key: "rut",
    label: "Rut",
    sortable: true,
    filterable: true,
  },
  {
    key: "birthday",
    label: "Fecha Nacimiento",
    sortable: true,
    filterable: true,
  },
  {
    key: "address",
    label: "Dirección",
    sortable: true,
    filterable: true,
  },
  {
    key: "phone",
    label: "Teléfono",
    sortable: true,
    filterable: true,
  },
  {
    key: "email",
    label: "Email",
    sortable: true,
    filterable: true,
  },
];

const getFields = (neededFields) => getNeededFields(fields, neededFields);

export default {
  fields,
  getFields,
};
