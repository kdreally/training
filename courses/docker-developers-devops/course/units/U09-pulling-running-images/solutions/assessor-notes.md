# U09 Assessor notes

## Model answer sketch

**Q1:** Registry stores images; Docker Hub is public registry to share/reuse images.

**Q2:** `docker pull nginx:latest` downloads only. `docker run nginx:latest` pulls if needed then create+start.

**Q3:** Tag labels version. `latest` convenient but mutable; pinned (e.g. `1.27.2`) predictable.

**Q4:** Show "Status: Downloaded" or equivalent, nginx in images, web-test in ps-a.

**Q5:** Official images vetted by maintainers; e.g. `nginx:official`/`ubuntu:latest` official.

**Q6:** UX: run assumes you want the image → pulls to satisfy request.

## Common weak submissions

- Says Docker Hub is Docker itself.
- Confuses tag with name.