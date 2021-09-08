import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import swal from "sweetalert2";
import { ApiGet, ApiPost } from "../../helpers/API/ApiData";
import DataTable from "../Useful Components/DataTable";

const AdminMentorship = () => {
  const history = useHistory();
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [mentorshipPrograms, setMentorshipPrograms] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleEditButton = (id) => {
    history.push("/createMentorshipProgram/" + id);
  };

  const handleCreateButton = () => {
    history.push("/createMentorshipProgram/");
  };

  const handleDeleteButton = (id) => {
    swal
      .fire({
        title: "Are you Sure you want delete this Program ?",
        text: "This Program will be deleted !",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        showLoaderOnConfirm: true,
        confirmButtonText: "Yes, delete it!",
      })
      .then(async (result) => {
        if (result.isConfirmed) {
          swal.fire({
            title: 'Deleting...',
            allowEscapeKey: false,
            allowOutsideClick: false,
            onOpen: async () => {
              swal.showLoading();
              let res = await ApiPost(
                "mentorship/deleteMentorshipProgram/" + id
              );
              if (parseInt(res.data.status / 100) === 2) {
                swal.fire({
                  position: "top-end",
                  icon: "success",
                  text: res.data.message,
                  title: "Success",
                  timer: 1500,
                  showConfirmButton: false,
                });
                history.replace("/manage/mentorshipProgram");
              } else {
                swal.fire({
                  position: "top-end",
                  icon: "error",
                  text: res.data.message,
                  title: "Failure",
                  timer: 1500,
                  showConfirmButton: false,
                });
              }
              swal.hideLoading();
            }
          })


        }
      });
  };

  const getAllPrograms = async () => {
    setLoading(true);
    await ApiGet("mentorshipProgram/")
      .then((res) => {
        setMentorshipPrograms(res.data.data)
      })
      .catch((err) => {
        console.log("Error while getting business directory", err)
      });
    setLoading(false);
  }

  useEffect(() => {
    getAllPrograms();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const headCells = [
    { id: ['name'], numeric: false, disablePadding: true, label: 'Program Name', ref: "AdminMentoring" },
    { id: ['menteeId'], numeric: true, disablePadding: false, label: 'No of Mentees', ref: "AdminMentoring" },
    { id: ['mentorId'], numeric: true, disablePadding: false, label: 'No of Mentors', ref: "AdminMentoring" },
    { id: ['startDate'], numeric: true, disablePadding: false, label: 'Start Date', ref: "AdminMentoring" },
    { id: ['endDate'], numeric: true, disablePadding: false, label: 'End Date', ref: "AdminMentoring" },
    { id: ['status'], numeric: true, disablePadding: false, label: 'Program Status', ref: "AdminMentoring" },
    { id: ['manage'], numeric: true, disablePadding: false, label: 'Manage', ref: "AdminMentoring" },
  ];

  return (
    <div>
      <div class="s-layout">
        <main class="s-layout__content flex flex-col">
          <div className="w-full h-20">
            <div className="container-fluid">
              <div className="dashboard-box mt-8 lg:p-5 md:p-3 sm:p-2">
                <div className="md:flex ">
                  <div className="md:w-full flex flex-row justify-between">
                    <h1 className="font-size-25 heading-title-text-color font-medium tracking-normal mb-0 cursor-pointer">
                      Manage Mentorship Activity
                    </h1>
                    <button
                      class="bg-blue-800 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                      type="submit"
                      onClick={() => handleCreateButton()}
                    >
                      Create Mentorship Program
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {/* //* Main Header */}
          <div className="row d-flex p-5 align-items-center w-100">
            <div className="col-md-12 d-flex align-items-center justify-content-md-start justify-content-sm-center">
              <h3>Mentorship Programs</h3>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-md-start justify-content-sm-center">
              <div className="input-group">
                <input
                  className="form-control py-2 rounded-pill mr-1 pr-5"
                  type="search"
                  placeholder="Search"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                  }}
                />
                {/* <span className="input-group-append">
                  <button className="btn rounded-pill border-0 ml-n13" type="button">
                    <i className="fa fa-search"></i>
                  </button>
                </span> */}
              </div>
            </div>
            <div className="col-md-6 d-flex align-items-center justify-content-md-start justify-content-sm-center mt-3">
              <select onChange={(e) => setStatus(e.target.value)}>
                <option value="">Program Status</option>
                <option value="notstarted">Not Started</option>
                <option value="ongoing">Ongoing</option>
                <option value="completed">Completed</option>
              </select>
            </div>
          </div>

          <DataTable headCells={headCells} rows={mentorshipPrograms} handleEditButton={handleEditButton} handleDeleteButton={handleDeleteButton} setState={setMentorshipPrograms} loading={loading} noRowsFoundMessage="No Mentorship Programs" />

          {/* <div className="row d-flex p-5 align-items-center w-100">
                <Paper className={classes.paper}>
                  <Table className={classes.table} aria-labelledby="tableTitle" size="medium" aria-label="enhanced table">
                    <EnhancedTableHead classes={classes} order={order} orderBy={orderBy} onRequestSort={handleRequestSort} rowCount={rows.length} />
                    <TableBody>
                      {stableSort(rows, getComparator(order, orderBy))
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((row, index) => {
                          return (
                            <TableRow>
                              <TableCell component="th" scope="row" padding="2">
                                {row.name}
                              </TableCell>
                              <TableCell>{row.mentorId.length}</TableCell>
                              <TableCell>{row.menteeId.length}</TableCell>
                              <TableCell>{new Date(row.startDate).toDateString()}</TableCell>
                              <TableCell>{row.endDate ? new Date(row.endDate).toDateString() : "-"}</TableCell>
                              <TableCell>{row.status}</TableCell>
                              <TableCell>
                                <Button
                                  variant="contained"
                                  className={classes.button_view}
                                  color="secondary"
                                  onClick={() => {
                                    history.push({
                                      pathname: "mentorshipProgram/mentoring/",
                                      state: { id: row._id, programStatus: row.status },
                                    });
                                  }}
                                >
                                  View
                                </Button>
                              </TableCell>
                            </TableRow>
                          );
                        })}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 33 * emptyRows }}>
                          <TableCell colSpan={6} />
                        </TableRow>
                      )}
                    </TableBody>
                  </Table>
                  <TablePagination rowsPerPageOptions={[5, 10, 25]} component="div" count={rows.length} rowsPerPage={rowsPerPage} page={page} onChangePage={handleChangePage} onChangeRowsPerPage={handleChangeRowsPerPage} />
                </Paper>
              </div> */}


        </main>
      </div>
    </div>
  );
};

export default AdminMentorship;
