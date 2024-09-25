import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { mockEvents } from "./mocks/events";
import { mockUsers } from "./mocks/users";

const mock = new MockAdapter(axios, { delayResponse: 500 });

mock.onGet("/api/events").reply(200, mockEvents);

mock.onGet(/\/api\/events\/\d+/).reply((config) => {
  const id = config.url?.split("/").pop();
  const event = mockEvents.find((e) => e.id === id);
  if (event) {
    return [200, event];
  } else {
    return [404, { message: "Event not found" }];
  }
});

mock.onPost("/api/auth/login").reply((config) => {
  return [200, { token: "fake-jwt-token", user: mockUsers[0] }];
});

mock.onGet("/api/users").reply(200, mockUsers);
