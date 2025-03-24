import PageBreadcrumb from "../../components/common/PageBreadCrumb";
import ComponentCard from "../../components/common/ComponentCard";
import PageMeta from "../../components/common/PageMeta";
import BasicTableOne from "../../components/tables/BasicTables/BasicTableOne";

export default function BasicTables({ title, tableTitle, addText, handleAddRecord, data, handleEdit, handleDelete }
  :
  { title: string, tableTitle: string, addText: string, handleAddRecord: any, data: any, handleEdit: any, handleDelete: any }) {

  return (
    <>
      <PageMeta
        title="React.js Basic Tables Dashboard | TailAdmin - Next.js Admin Dashboard Template"
        description="This is React.js Basic Tables Dashboard page for TailAdmin - React.js Tailwind CSS Admin Dashboard Template"
      />
      <PageBreadcrumb pageTitle={title} />
      <div className="space-y-6">
        <ComponentCard 
        title={tableTitle} 
        addText={addText} 
        handleAddRecord={handleAddRecord}>
          <BasicTableOne data={data} handleEdit={handleEdit} handleDelete = {handleDelete} />
        </ComponentCard>
      </div>
    </>
  );
}
