var fs = require("fs");

const GetData = () => {
  const data = fs.readFileSync("mock-data.json");
  return JSON.parse(data);
};

const SaveData = (data) => {
  const stringifyData = JSON.stringify(data);
  fs.writeFileSync("mock-data.json", stringifyData);
};

module.exports.Controller = {
  GetAll: (req, res) => {
    const blogs = GetData();
    res.status(200).json(blogs);
  },
  CreateBlog: (req, res) => {
    const data = GetData();
    const newBlog = req.body;
    const existId = data.find((blog) => blog.id === newBlog.id);
    if (existId) {
      return res.status(200).send("Id is already exist");
    }
    data.push(newBlog);
    SaveData(data);
    res.status(200).json("Create blog successfully!");
  },
  UpdateBlog: (req, res) => {
    const { id } = req.params;
    const blogs = GetData();
    const updateDataBlog = req.body;
    const checkExist = blogs.find((blog) => blog.id === id);
    if (!checkExist) {
      return res.status(404).json("Blog isn't exist! Pls try again");
    } else {
      const updatedBlog = blogs.filter((blog) => blog.id !== id);
      updatedBlog.push(updateDataBlog);
      SaveData(updatedBlog);
      res.status(200).json("Update Blog successfully!");
    }
  },
  DeleteBlog: (req, res) => {
    const { id } = req.params;
    const blogs = GetData();
    const filterBlog = blogs.filter((blog) => blog.id !== id);
    if (filterBlog.length === blogs.length) {
      return res.status(404).json("Blog does not exist");
    }
    SaveData(filterBlog);
    res.status(200).json("Delete Blog successfully!");
  },
};
