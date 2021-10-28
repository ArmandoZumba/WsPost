using System;
using System.Collections.Generic;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Threading.Tasks;
using WSPost.Dominio;

namespace WSPost.Context
{
    public class BlogDB
    {
        public List<PostModel> ObtenerInformacionBlog() {
            List<PostModel> listado = new List<PostModel>();

            using (var connection = new SqlConnection("Server=localhost\\SQLEXPRESS01;Database=PostDB;Trusted_Connection=True;"))
            {
                var sql = "SELECT * FROM Informacion";
                using (var cmd = new SqlCommand(sql, connection))
                {
                    using (var adapter = new SqlDataAdapter(cmd))
                    {
                        var resultTable = new DataTable();
                        adapter.Fill(resultTable);

                        for (int i = 0; i < resultTable.Rows.Count; i++)
                        {
                            PostModel item = new PostModel();
                            item.Id = Convert.ToInt32(resultTable.Rows[i]["Id"].ToString());
                            item.Link = Convert.ToString(resultTable.Rows[i]["Link"]);
                            item.Name = Convert.ToString(resultTable.Rows[i]["Name"]);
                            item.Date = Convert.ToString(resultTable.Rows[i]["Date"]);
                            item.Content = Convert.ToString(resultTable.Rows[i]["Content"]);

                            listado.Add(item);
                        }

                    }
                }
            }

            return listado;
        }

        public void GrabarInformacionBlog(PostModel postModel) {
            using (var connection = new SqlConnection("Server=localhost\\SQLEXPRESS01;Database=PostDB;Trusted_Connection=True;"))
            {
                var sql = "INSERT INTO [dbo].[Informacion]  " +
                    "            ([link]" +
                    "            ,[name] " +
                    "            ,[content] " +
                    "            ,[date]) " +
                    "       VALUES ('" + postModel.Link + "', " +
                    "               '" + postModel.Name + "', " +
                    "               '" + postModel.Content + "', " +
                    "               '" + postModel.Date + "')";

                using (var cmd = new SqlCommand(sql, connection))
                {
                    cmd.ExecuteNonQuery();
                }
            }
        }
    }
}
