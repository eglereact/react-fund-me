import { useContext, useEffect, useState } from "react";
import { RouterContext } from "../../Contexts/Router";
import useServerGet from "../../Hooks/useServerGet";
import useServerPut from "../../Hooks/useServerPut";
import * as l from "../../Constants/urls";
import Input from "../Forms/Input";
import Select from "../Forms/Select";
import { LoaderContext } from "../../Contexts/Loader";
import categories from "../../Constants/categories";

export default function PostEdit() {
  const { params } = useContext(RouterContext);
  const { doAction: doGet, response: serverGetResponse } = useServerGet(
    l.SERVER_EDIT_POST
  );
  const { doAction: doPut, serverResponse: serverPutResponse } = useServerPut(
    l.SERVER_UPDATE_POST
  );

  const { setShow } = useContext(LoaderContext);
  const [post, setPost] = useState(null);

  useEffect(() => {
    doGet("/" + params[1]);
  }, [doGet, params]);

  useEffect(() => {
    if (null === serverGetResponse) {
      return;
    }
    setPost(serverGetResponse.data.user ?? null);
  }, [serverGetResponse]);

  useEffect(() => {
    if (null === serverPutResponse) {
      return;
    }
    if ("success" === serverPutResponse.type) {
      window.location.href = l.POSTS_LIST;
    }
  }, [serverPutResponse]);

  const handleForm = (e) => {
    setPost((u) => ({ ...u, [e.target.name]: e.target.value }));
  };

  const submit = (_) => {
    //TODO: Validation
    setShow(true);
    doPut(post);
  };

  return (
    <>
      <h1 className="text-4xl mb-10">Post Edit</h1>
      <section>
        {null === post && <h3>Loading...</h3>}
        {null !== post && (
          <form>
            <div className="flex flex-col gap-1 mb-5">
              <Select
                onChange={handleForm}
                value={post.approved}
                name="approved"
                options={[
                  { value: 0, label: "not approved" },
                  { value: 1, label: "approved" },
                ]}
                label="Select Approved"
              />
              <Select
                onChange={handleForm}
                value={post.featured}
                name="featured"
                options={[
                  { value: 0, label: "not featured" },
                  { value: 1, label: "featured" },
                ]}
                label="Select Featured"
              />
            </div>
            <Input
              onChange={handleForm}
              value={post.title}
              type="text"
              name="title"
              label="Title"
            />
            <Input
              onChange={handleForm}
              value={post.text}
              type="text"
              name="text"
              autoComplete="off"
              label="Text"
            />
            <Input
              onChange={handleForm}
              value={post.amount}
              type="number"
              name="amount"
              autoComplete="off"
              label="Amount"
            />
            <Select
              onChange={handleForm}
              value={post.category}
              name="category"
              options={categories}
              label="Select Category"
            />
            <ul className="flex items-center gap-4 mt-6">
              <li>
                <button onClick={submit} type="button" className="button-light">
                  Save
                </button>
              </li>
              <li>
                <a className="button-empty" href={"/" + l.POSTS_LIST}>
                  All posts
                </a>
              </li>
            </ul>
          </form>
        )}
      </section>
    </>
  );
}
