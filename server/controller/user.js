import user from "../model/user.js";
import cart from "../model/cart.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import { appendFile, writeFile } from "fs";

const getUsers = (req, res) => {
  user
    .find({})
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err);
    });
};

const createUser = (req, res) => {
  const { username, password, email } = req.body;
  const newUser = new user({
    username,
    password,
    email,
  });
  newUser
    .save()
    .then((data) => {
      res.status(200).json(data);
      console.log(data);
    })
    .catch((err) => {
      user
        .findOne({ email })
        .then((x) => {
          if (x != null) {
            res.json({ duplicate: true });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    });
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;

  if (!email) {
    if (!password) {
      return res.status(400).json({
        message: "blank",
      });
    } else {
      return res.status(400).json({
        message: "user_blank",
      });
    }
  } else {
    if (!password) {
      return res.status(400).json({
        message: "pass_blank",
      });
    }
  }

  const person = await user.findOne({ email });
  if (person == null) {
    return res.json({ message: "not_found" });
  }

  const match = await bcrypt.compare(password, person.password);
  if (match) {
    console.log("person matched");
    const payload = {
      email,
      id: person._id,
    };
    jwt.sign(payload, process.env.SECRET, { expiresIn: "1d" }, (err, token) => {
      if (err) {
        console.log(err);
      } else {
        res.json({ status: "success", token: token });
        // console.log(token);
      }
    });
  } else {
    console.log("person not matched");
    res.status(401).json({ message: "not_matched" });
  }
};

const forgotPassword = (req, res) => {
  const { email } = req.body;
  user
    .findOne({ email })
    .then((data) => {
      if (data == null) {
        res.json({ message: "not_found" });
      } else {
        res.json({ message: "success" });
        const secret = process.env.SECRET2 + data.password;
        const payload = {
          email,
          id: data._id,
        };
        const reset = jwt.sign(payload, secret, { expiresIn: "15m" });
        let transport = nodemailer.createTransport({
          service: "gmail",
          auth: {
            user: "alifrahi22@gmail.com",
            pass: "Cunyfirst2022",
          },
          tls: { rejectUnauthorized: false },
        });

        let mailOptions = {
          from: "alifrahi22@gmail.com",
          to: `${email}`,
          subject: "~ Reset password faggot",
          text: `http://localhost:3000/resetPass/${data._id}/${reset}`,
        };

        transport.sendMail(mailOptions, (err, data) => {
          if (err) {
            console.log(err);
          } else {
            console.log("mail sent");
          }
        });
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

const welcomeUser = (req, res) => {
  const { id } = req.user;

  user.findOne({ _id: id }, (err, data) => {
    const { _id, email, username } = data;
    if (err) {
      console.log(err);
    } else {
      res.json({ _id, email, username });
    }
  });
};

async function hashPassword(original_password) {
  const hashedPass = await bcrypt.hash(original_password, 10);
  return hashedPass; //returns [object Promise]
}
const contact = (req, res) => {
  const { email, message } = req.body;
  let transport = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "alifrahi22@gmail.com",
      pass: "Cunyfirst2022",
    },
    tls: { rejectUnauthorized: false },
  });

  let mailOptions = {
    from: "alifrahi22@gmail.com",
    to: `alifrahi22@gmail.com`,
    subject: `Message from ${email}`,
    text: `${message}`,
  };

  transport.sendMail(mailOptions, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      res.json({ message: "success" });
      console.log("mail sent");
    }
  });
};

const resetPassword = (req, res) => {
  const { token, id } = req.params;
  const { newPass } = req.body;
  user.findById({ _id: id }, (err, data) => {
    if (err) {
      console.log(err);
    } else {
      const { password } = data;
      const secret = "secret1234" + password;
      jwt.verify(token, secret, (err, data) => {
        if (err) {
          console.log("invald token");
        } else {
          hashPassword(newPass)
            .then((hashed) => {
              user.findByIdAndUpdate(
                { _id: id },
                { password: hashed },
                (err, newData) => {
                  if (err) {
                    console.log(err);
                  } else {
                    res.json({ message: "sent" });
                    console.log(newData);
                    console.log("user password updated!");
                  }
                }
              );
            })
            .catch((err) => {
              console.log("error hashing");
            });
        }
      });
    }
  });
};

const addItems = (req, res) => {
  const { items, amount, total } = req.body;
  let newTotal = Number(total.toFixed(2));
  const { id } = req.user;
  const newItem = new cart({
    items,
    amount: items.length,
    total: newTotal,
  });

  newItem
    .save()
    .then((userCart) => {
      user.findByIdAndUpdate({ _id: id }, { cart: userCart }).then((x) => {
        res.json({ x });
        console.log("cart updated sucesfully");
      });
    })
    .catch(() => {
      console.log("err saving cart");
    });
};

const Items = (req, res) => {
  const { id } = req.user;
  user
    .findById({ _id: id })
    .then((user) => {
      res.json({ cart: user.cart });
      console.log(user.cart);
    })
    .catch(() => {
      console.log("error fetching cart");
    });
};

const purchase = (req, res) => {
  const { cart } = req.body;
  const { email } = req.user;
  // console.log(items);

  writeFile("send.txt", `Thank you for your purchase! \n`, (err, data) => {
    if (err) {
      console.log("err writing file");
    } else {
      cart.forEach((x) => {
        appendFile("send.txt", `${x.title}: ${x.url} \n`, (err, data) => {
          if (err) {
            console.log("err writing file");
          } else {
            console.log("success");
          }
        });
      });
      let transport = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "alifrahi22@gmail.com",
          pass: "Cunyfirst2022",
        },
        tls: { rejectUnauthorized: false },
      });

      let mailOptions = {
        from: "alifrahi22@gmail.com",
        to: `${email}`,
        subject: "Beatsbyalif",
        text: `Hi, Your download links are ready!`,
        attachments: [{ filename: "send.txt", path: "send.txt" }],
      };

      transport.sendMail(mailOptions, (err, data) => {
        if (err) {
          console.log(err);
        } else {
          console.log("mail sent");
        }
      });
    }
  });
};

export default {
  contact,
  purchase,
  Items,
  addItems,
  createUser,
  loginUser,
  getUsers,
  welcomeUser,
  forgotPassword,
  resetPassword,
};
