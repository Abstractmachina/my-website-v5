import { authenticated } from "@/access/authenticated";
import LABELS from "@/LABELS";
import { CollectionConfig } from "payload";

const Income: CollectionConfig = {
  slug: "income",
  admin: {
    group: LABELS.personal,
  },
  access: {
    create: authenticated,
    delete: authenticated,
    read: authenticated,
    update: authenticated,
  },
  labels: {
    singular: "Income",
    plural: "Income",
  },
  fields: [
    {
      name: "amount",
      type: "number",
      required: true,
    },
    {
      name: "description",
      type: "text",
      required: true,
    },
    {
      name: "date",
      type: "date",
      required: true,
    },
    {
      name: "recurring",
      type: "checkbox",
      required: true,
    }
  ],
};

export default Income;