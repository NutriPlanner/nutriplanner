import { OBJECT_ID } from "../../utils/fieldsTypes";
import { getNeededFields } from "../../utils/fields";

const fields = [
  {
    key: "id",
    label: "ID",
    sortable: false,
    filterable: true,
    type: OBJECT_ID,
    tdClass: "align-middle",
    thStyle: "width: 210px",
  },
  {
    key: "subject",
    label: "Asunto",
    sortable: true,
    filterable: true,
    tdClass: "align-middle",
  },
  {
    key: "status",
    label: "Estado",
    sortable: true,
    filterable: true,
    thStyle: "width: 125px",
    tdClass: "align-middle",
  },
  {
    key: "date",
    label: "Actualizado",
    sortable: true,
    filterable: false,
  },
];

const getFields = (neededFields) => getNeededFields(fields, neededFields);

export default {
  fields,
  getFields,
};
